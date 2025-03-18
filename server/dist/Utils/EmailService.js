"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodejs_1 = require("@emailjs/nodejs");
const sendEmail = async (resetEmail, resetLink) => {
    try {
        const response = await nodejs_1.default.send('service_jc78pyd', 'template_irkmpg8', {
            resetLink: resetLink,
            email: resetEmail,
        }, {
            publicKey: "7gxGKC-8BonyOFEIE"
        });
        return response;
    }
    catch (error) {
        return error;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=EmailService.js.map