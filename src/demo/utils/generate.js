import _format from 'date-fns/format';
import { company, internet, name, phone, random } from 'faker';

/**
 * Generate a className for an HTML element
 *
 * @method genClassName
 * @param  {number}     [length=10] The length of the generated className, usually between 1 to 10
 * @return {string}                 The generated className
 */
export const genClassName = length => {
    // Generate a random number then base64 hash it
    const bRand = btoa(Math.random());
    // Return a slice of the randmoly generated hash
    return bRand.slice(0, length || 10);
};

// Generate a sample of user data
export const genUsers = (numberOfUsers = 1) =>
    [...Array(numberOfUsers).keys()].map(item => {
        const firstName = name.firstName();
        const lastName = name.lastName();
        const email = internet.email(firstName, lastName);

        return {
            brokerName: company.companyName(),
            companyName: company.companyName(),
            email,
            firstName,
            isActive: 1,
            lastName,
            phone: phone.phoneNumber(),
            userId: random.uuid().slice(0, 8),
        };
    });

/**
 * Generate a number of news items
 *
 * @method generateNewsItems
 * @param  {number}          [count=1] The count of news items to generate
 * @return {Array}
 */
export const generateNewsItems = (count = 1) =>
    Array.from(new Array(count).keys()).map(item => ({
        author: name.findName(),
        date: _format(new Date(+new Date() - Math.floor(Math.random() * 1e10)), 'MMMM D, YYYY'),
        excerpt:
            'Suspendisse vitae volutpat lectus. Suspendisse eleifend, nisl et laoreet aliquet, elit dui bibendum nulla, sed mattis dui lorem eget lectus. Mauris ornare volutpat lacus ac vulputate.',
        image: 'https://via.placeholder.com/235x150',
        love: Math.floor(Math.random() * 100),
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    }));
