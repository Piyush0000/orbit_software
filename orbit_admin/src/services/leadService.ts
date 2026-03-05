const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002") + "/api/leads";
const API_TIMEOUT = 5000; // 5 seconds

// Fetch with timeout
const fetchWithTimeout = (url: string, options: any = {}): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("API timeout")), API_TIMEOUT)
    ),
  ]);
};

// Get all leads with optional filters
export const fetchLeads = async (filters?: {
  status?: string;
  formType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters) {
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.formType) queryParams.append("formType", filters.formType);
      if (filters.startDate) queryParams.append("startDate", filters.startDate);
      if (filters.endDate) queryParams.append("endDate", filters.endDate);
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.limit) queryParams.append("limit", filters.limit.toString());
    }

    const response = await fetchWithTimeout(
      `${API_URL}?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch leads");
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, returning empty data:", error);
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 50,
        pages: 1,
      },
    };
  }
};

// Get a single lead by ID
export const getLeadById = async (id: string) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch lead");
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, returning null");
    return null;
  }
};

// Create a new lead
export const createLead = async (leadData: Record<string, any>) => {
  try {
    const response = await fetchWithTimeout(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });
    if (!response.ok) {
      throw new Error("Failed to create lead");
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, cannot create lead");
    throw error;
  }
};

// Update a lead (for status change and other updates)
export const updateLead = async (
  id: string,
  leadData: Record<string, any>
) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });
    if (!response.ok) {
      throw new Error("Failed to update lead");
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, cannot update lead");
    throw error;
  }
};

// Delete a lead
export const deleteLead = async (id: string) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete lead");
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, cannot delete lead");
    throw error;
  }
};

// Update lead status
export const updateLeadStatus = async (
  id: string,
  status: "leads" | "contacted" | "won" | "lost"
) => {
  return updateLead(id, { status: status.toUpperCase() });
};

// Bulk update lead statuses
export const bulkUpdateLeadStatus = async (
  ids: string[],
  status: "leads" | "contacted" | "won" | "lost"
) => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/bulk/status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids, status: status.toUpperCase() }),
    });
    if (!response.ok) {
      throw new Error("Failed to update lead statuses");
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, cannot bulk update");
    throw error;
  }
};

// Get lead statistics
export const getLeadStats = async () => {
  try {
    const response = await fetchWithTimeout(`${API_URL}/stats/summary`);
    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }
    return await response.json();
  } catch (error) {
    console.warn("API unavailable, returning empty stats");
    return {
      new: 0,
      contacted: 0,
      won: 0,
      lost: 0,
      total: 0,
    };
  }
};
