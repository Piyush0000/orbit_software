import Header from "@/components/Header";
import OrderSuccess from "@/components/order/OrderSuccess";
import OrderActions from "@/components/order/OrderActions";

export default function OrderConfirmationPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
                <OrderSuccess />
                <OrderActions />
            </div>
        </main>
    );
}
