import { Question } from '@/types/product';

export const questions: Question[] = [
    // Zenith X1 (ID: 1)
    {
        id: 101,
        productId: 1,
        user: "GamerPro99",
        text: "Is the RAM upgradeable?",
        date: new Date('2023-11-22'),
        answers: [
            {
                id: 1,
                user: "Orbit Support",
                text: "Yes, the Zenith X1 supports up to 64GB of DDR5 RAM via two SODIMM slots.",
                date: new Date('2023-11-22')
            }
        ]
    },
    // NovaPhone 15 (ID: 2)
    {
        id: 201,
        productId: 2,
        user: "TechFan",
        text: "Does this come with a charger in the box?",
        date: new Date('2023-09-16'),
        answers: [
            {
                id: 2,
                user: "Orbit Support",
                text: "No, the box includes a USB-C cable but the wall adapter is sold separately.",
                date: new Date('2023-09-17')
            }
        ]
    }
];

export const getQuestionsByProductId = (productId: number) => {
    return questions.filter(q => q.productId === productId);
};
