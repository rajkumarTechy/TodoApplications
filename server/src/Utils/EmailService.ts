import emailjs from '@emailjs/nodejs';

export const sendEmail = async (resetEmail: string, resetLink: string) => {
    try {
        const response = await emailjs.send('service_jc78pyd', 'template_irkmpg8', {
            resetLink: resetLink,
            email: resetEmail,
        }, {
            publicKey: "7gxGKC-8BonyOFEIE"
        });

        return response; 
    } catch (error) {
        return error; 
    }
};

