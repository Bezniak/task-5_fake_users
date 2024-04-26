import {handleError} from "./handleError";

export const generateUserData = (faker, count, errorPerRecord, region, seed) => {
    faker.seed(seed);
    const data = [];
    const maxFieldLength = 100;
    const maxDisplayLength = 30;

    for (let i = 0; i < count; i++) {
        let name = faker.person.fullName();
        let address = faker.location.streetAddress();
        let phone = faker.phone.number();
        let randomIdentifier = faker.string.uuid();

        let modifiedName = name;
        let modifiedAddress = address;
        let modifiedPhone = phone;

        for (let j = 0; j < errorPerRecord; j++) {
            const errorType = Math.floor(Math.random() * 3);
            const randomField = Math.floor(Math.random() * 3);

            modifiedName = handleError(errorType, randomField, modifiedName, maxFieldLength);
            modifiedAddress = handleError(errorType, randomField, modifiedAddress, maxFieldLength);
            modifiedPhone = handleError(errorType, randomField, modifiedPhone, maxFieldLength);


            modifiedName = modifiedName.slice(0, maxDisplayLength);
            modifiedAddress = modifiedAddress.slice(0, maxDisplayLength);
            modifiedPhone = modifiedPhone.slice(0, maxDisplayLength);
        }

        data.push({name: modifiedName, address: modifiedAddress, phone: modifiedPhone, uuid: randomIdentifier});
    }
    return data;
};
