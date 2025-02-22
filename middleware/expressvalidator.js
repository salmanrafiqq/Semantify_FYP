import { body, validationResult } from 'express-validator';

const validateUser = [
    body('password').isLength({ min: 6}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({ errors: errors.array() });
        next();
    },
];

export default validateUser
