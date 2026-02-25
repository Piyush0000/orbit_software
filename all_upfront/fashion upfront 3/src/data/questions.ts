import { Question } from '@/types/product';

export const questions: Question[] = [
    // Classic White Tee (ID: 1)
    {
        id: 101,
        productId: 1,
        user: "Alex T.",
        text: "Is this 100% cotton?",
        date: new Date('2023-10-01'),
        answers: [
            {
                id: 1,
                user: "Orbit Support",
                text: "Yes, this t-shirt is made from 100% premium cotton.",
                date: new Date('2023-10-02')
            }
        ]
    },
    {
        id: 102,
        productId: 1,
        user: "Jordan M.",
        text: "Does it shrink in the wash?",
        date: new Date('2023-11-12'),
        answers: [
            {
                id: 2,
                user: "John Doe",
                text: "Mine shrank just a tiny bit, but it was pre-shrunk so it mostly held its size. I recommend cold wash.",
                date: new Date('2023-11-13')
            }
        ]
    },

    // Denim Jacket (ID: 2)
    {
        id: 201,
        productId: 2,
        user: "Sam K.",
        text: "Does this jacket have inside pockets?",
        date: new Date('2023-08-15'),
        answers: [
            {
                id: 3,
                user: "Orbit Support",
                text: "Yes, there are two deep inside pockets in addition to the four outer pockets.",
                date: new Date('2023-08-16')
            }
        ]
    },

    // Summer Floral Dress (ID: 3)
    {
        id: 301,
        productId: 3,
        user: "Lisa P.",
        text: "Is the waist elastic?",
        date: new Date('2023-06-20'),
        answers: [
            {
                id: 4,
                user: "Orbit Support",
                text: "It has a drawstring waist that you can adjust for the perfect fit.",
                date: new Date('2023-06-21')
            }
        ]
    }
];

export const getQuestionsByProductId = (productId: number) => {
    return questions.filter(q => q.productId === productId);
};
