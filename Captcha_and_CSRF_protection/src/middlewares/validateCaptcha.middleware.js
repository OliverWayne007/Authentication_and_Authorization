const validateCaptcha = (request , response , next) => {

    if( !request.body.captcha )
    {
        return response.status(400).json("Please enter the captcha !!!");
    }

    const { captcha } = request.body;

    if(captcha != request.session.captcha)
    {
        return response.status(400).json("Invalid Captcha !");
    }

    next();
}

export  { validateCaptcha }