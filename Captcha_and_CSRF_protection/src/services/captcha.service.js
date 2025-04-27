import svgCaptcha from 'svg-captcha';

export const generateCaptcha = (request , response) => {
    const captcha = svgCaptcha.create( { 
        size: 6 , 
        noise: 2 , 
        color: true
    } );
    console.log(request.session);
    request.session.captcha = captcha.text;
    console.log(captcha.text);
    console.log(request.session);
    response.type("svg");
    response.send(captcha.data);
}