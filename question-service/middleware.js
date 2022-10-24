export const block = (req, res, next) => {
    res.status(403).send("Forbidden");
};

export const allow = (req, res, next) => {
    next();
};
