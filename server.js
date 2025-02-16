const express = require("express");  // Express könyvtár betöltése
const app = express();  // Express alkalmazás létrehozása
const data = require("./data");  // Adatok betöltése, amit a végpontok használnak
const {
  userSchema,
  dietSchema,
  exerciseSchema,
  workoutSchema,
} = require("./validation");  // Validációs séma fájlok betöltése

app.use(express.json());  // JSON formátumú adatokat tudunk kezelni a kéréseknél

// Felhasználók végpontok
app.get("/users", (req, res) => res.json(data.users));  // Az összes felhasználó visszaadása
app.get("/users/:id", (req, res) => {  // Egy felhasználó keresése az ID alapján
  const user = data.users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");  // Ha nem található, 404-es hibát ad
  res.json(user);  // Visszaadja a felhasználót
});
app.post("/users", (req, res) => {  // Új felhasználó létrehozása
  const { error } = userSchema.validate(req.body);  // Validálás a sémával
  if (error) return res.status(400).send(error.details[0].message);  // Ha hiba van a validálás során, 400-as hibát ad
  const newUser = { id: data.users.length + 1, ...req.body };  // Új felhasználó létrehozása
  data.users.push(newUser);  // Új felhasználó hozzáadása az adatokhoz
  res.status(201).json(newUser);  // 201-es státuszkóddal visszaadja az új felhasználót
});
app.put("/users/:id", (req, res) => {  // Felhasználó frissítése az ID alapján
  const user = data.users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).send("User not found");  // Ha nem található, 404-es hibát ad
  Object.assign(user, req.body);  // A meglévő felhasználó frissítése az új adatokkal
  res.json(user);  // Visszaadja az frissített felhasználót
});
app.delete("/users/:id", (req, res) => {  // Felhasználó törlése az ID alapján
  const index = data.users.findIndex((u) => u.id == req.params.id);  // Megkeresi a felhasználót
  if (index === -1) return res.status(404).send("User not found");  // Ha nem található, 404-es hibát ad
  data.users.splice(index, 1);  // Törli a felhasználót az adatokból
  res.status(204).send();  // 204-es státuszkóddal visszaadja a válasz, jelezve a törlést
});

// Étrend végpontok
app.get("/diet", (req, res) => res.json(data.diet));  // Az összes diéta visszaadása
app.post("/diet", (req, res) => {  // Új diéta létrehozása
  const { error } = dietSchema.validate(req.body);  // Validálás a sémával
  if (error) return res.status(400).send(error.details[0].message);  // Ha hiba van a validálás során, 400-as hibát ad
  const newDiet = { id: data.diet.length + 1, ...req.body };  // Új diéta létrehozása
  data.diet.push(newDiet);  // Új diéta hozzáadása az adatokhoz
  res.status(201).json(newDiet);  // 201-es státuszkóddal visszaadja az új diétát
});
app.put("/diet/:id", (req, res) => {  // Diéta frissítése az ID alapján
  const diet = data.diet.find((d) => d.id == req.params.id);
  if (!diet) return res.status(404).send("Diet not found");  // Ha nem található, 404-es hibát ad
  Object.assign(diet, req.body);  // A meglévő diéta frissítése az új adatokkal
  res.json(diet);  // Visszaadja az frissített diétát
});
app.delete("/diet/:id", (req, res) => {  // Diéta törlése az ID alapján
  const index = data.diet.findIndex((d) => d.id == req.params.id);  // Megkeresi a diétát
  if (index === -1) return res.status(404).send("Diet not found");  // Ha nem található, 404-es hibát ad
  data.diet.splice(index, 1);  // Törli a diétát az adatokból
  res.status(204).send();  // 204-es státuszkóddal visszaadja a válasz, jelezve a törlést
});

// Gyakorlatok végpontok
app.get("/exercises", (req, res) => res.json(data.exercises));  // Az összes gyakorlat visszaadása
app.post("/exercises", (req, res) => {  // Új gyakorlat létrehozása
  const { error } = exerciseSchema.validate(req.body);  // Validálás a sémával
  if (error) return res.status(400).send(error.details[0].message);  // Ha hiba van a validálás során, 400-as hibát ad
  const newExercise = { id: data.exercises.length + 1, ...req.body };  // Új gyakorlat létrehozása
  data.exercises.push(newExercise);  // Új gyakorlat hozzáadása az adatokhoz
  res.status(201).json(newExercise);  // 201-es státuszkóddal visszaadja az új gyakorlatot
});
app.put("/exercises/:id", (req, res) => {  // Gyakorlat frissítése az ID alapján
  const exercise = data.exercises.find((e) => e.id == req.params.id);
  if (!exercise) return res.status(404).send("Exercise not found");  // Ha nem található, 404-es hibát ad
  Object.assign(exercise, req.body);  // A meglévő gyakorlat frissítése az új adatokkal
  res.json(exercise);  // Visszaadja az frissített gyakorlatot
});
app.delete("/exercises/:id", (req, res) => {  // Gyakorlat törlése az ID alapján
  const index = data.exercises.findIndex((e) => e.id == req.params.id);  // Megkeresi a gyakorlatot
  if (index === -1) return res.status(404).send("Exercise not found");  // Ha nem található, 404-es hibát ad
  data.exercises.splice(index, 1);  // Törli a gyakorlatot az adatokból
  res.status(204).send();  // 204-es státuszkóddal visszaadja a válasz, jelezve a törlést
});

// Edzések végpontok
app.get("/workouts", (req, res) => res.json(data.workouts));  // Az összes edzés visszaadása
app.post("/workouts", (req, res) => {  // Új edzés létrehozása
  const { error } = workoutSchema.validate(req.body);  // Validálás a sémával
  if (error) return res.status(400).send(error.details[0].message);  // Ha hiba van a validálás során, 400-as hibát ad
  const newWorkout = { id: data.workouts.length + 1, ...req.body };  // Új edzés létrehozása
  data.workouts.push(newWorkout);  // Új edzés hozzáadása az adatokhoz
  res.status(201).json(newWorkout);  // 201-es státuszkóddal visszaadja az új edzést
});
app.put("/workouts/:id", (req, res) => {  // Edzés frissítése az ID alapján
  const workout = data.workouts.find((w) => w.id == req.params.id);
  if (!workout) return res.status(404).send("Workout not found");  // Ha nem található, 404-es hibát ad
  Object.assign(workout, req.body);  // A meglévő edzés frissítése az új adatokkal
  res.json(workout);  // Visszaadja az frissített edzést
});
app.delete("/workouts/:id", (req, res) => {  // Edzés törlése az ID alapján
  const index = data.workouts.findIndex((w) => w.id == req.params.id);  // Megkeresi az edzést
  if (index === -1) return res.status(404).send("Workout not found");  // Ha nem található, 404-es hibát ad
  data.workouts.splice(index, 1);  // Törli az edzést az adatokból
  res.status(204).send();  // 204-es státuszkóddal visszaadja a válasz, jelezve a törlést
});

// A szerver indítása
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Az alkalmazás a 3000-es porton fut
