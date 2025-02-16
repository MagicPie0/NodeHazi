const Joi = require('joi');  // Joi könyvtár betöltése, ami segít az adatok validálásában

// Felhasználói séma létrehozása (validálás a felhasználók adatainak)
const userSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),  // A név egy karakterlánc, legalább 3, legfeljebb 255 karakter, és kötelező
    email: Joi.string().email().required()  // Az email egy érvényes email cím, és kötelező
});

// Diéta séma létrehozása (validálás az étrend adataira)
const dietSchema = Joi.object({
    user_id: Joi.number().integer().required(),  // A felhasználó ID-ja egy egész szám, és kötelező
    food_name: Joi.string().min(3).max(255).required()  // Az étel neve egy karakterlánc, legalább 3, legfeljebb 255 karakter, és kötelező
});

// Gyakorlat séma létrehozása (validálás a gyakorlatok adataira)
const exerciseSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),  // A gyakorlat neve egy karakterlánc, legalább 3, legfeljebb 255 karakter, és kötelező
    muscle_group_id: Joi.number().integer().required()  // Az izomcsoport ID-ja egy egész szám, és kötelező
});

// Edzés séma létrehozása (validálás az edzés adatainak)
const workoutSchema = Joi.object({
    user_id: Joi.number().integer().required(),  // A felhasználó ID-ja egy egész szám, és kötelező
    exercise_id: Joi.number().integer().required()  // A gyakorlat ID-ja egy egész szám, és kötelező
});

// A sémák exportálása, hogy más fájlok is használhassák őket
module.exports = { userSchema, dietSchema, exerciseSchema, workoutSchema };
