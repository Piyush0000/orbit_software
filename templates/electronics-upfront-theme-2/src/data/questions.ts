import { Question } from '@/types/product';

export const questions: Question[] = [
    // Premium Headphones (ID: 1)
    {
        id: 101,
        productId: 1,
        user: "Alex T.",
        text: "Does this support multipoint connection?",
        date: new Date('2023-10-01'),
        answers: [
            {
                id: 1,
                user: "Orbit Support",
                text: "Yes, these headphones support connecting to two devices simultaneously via Bluetooth 5.0.",
                date: new Date('2023-10-02')
            }
        ]
    },
    {
        id: 102,
        productId: 1,
        user: "Jordan M.",
        text: "Are the ear pads replaceable?",
        date: new Date('2023-11-12'),
        answers: [
            {
                id: 2,
                user: "John Doe",
                text: "Yes, they twist off easily. You can buy replacements from their website.",
                date: new Date('2023-11-13')
            }
        ]
    },

    // Smart Watch (ID: 2)
    {
        id: 201,
        productId: 2,
        user: "Sam K.",
        text: "Is it compatible with iPhone?",
        date: new Date('2023-08-15'),
        answers: [
            {
                id: 3,
                user: "Orbit Support",
                text: "Yes, it is compatible with iOS 12 and above as well as Android 6.0+.",
                date: new Date('2023-08-16')
            }
        ]
    }
];

export const getQuestionsByProductId = (productId: number) => {
    return questions.filter(q => q.productId === productId);
};
