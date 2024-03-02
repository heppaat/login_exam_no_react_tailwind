## Készítsetek egy User regisztrációs felületet.

Legyen egy input mező az email címhez, illetve 2 a jelszóhoz (ebből egy a jelszómegerősítés), valamint egy gomb a regisztrációhoz.

### Elvárt működés:
- Az email mező széle piros, ha NEM jó az email, zöld, ha igen. (A van benne egy @, egy ., illetve az elején, közöttük, illetve a végén legalább egy karakter.)
- A jelszó mező széle piros, ha NEM jó a jelszó, zöld, ha igen. (Legalább 5 karakter.)
- A jelszó megerősítő mező széle piros, ha NEM jó a megerősítés, zöld, ha igen. (Egyezik a jelszóval.)
- A regisztráló gomb nem működik, amíg bármilyen hiba van.
- Sikeres regisztráció után a form eltűnik, helyette egy sikert jelző ablakkal, melyen egy egy rövid szöveg ("Sikeres reg...") mellett egy "Vissza a főoldalra" gomb van. Ez a gomb újra előhozza formot.
- Sikertelen regisztráció esetén a form nem tűnik el, egy értelmes hibaüzenet ellenben megjelenik, ez egy kattintással elrejthető.
- Legyen lekezelve mind szerver, mind kliens oldalon a szerver oldali hiba, a kliens oldali hiba (nem megfelelő email/jelszó/megerősítés + LÉTEZŐ FELHASZNÁLÓ), illetve kliens oldalon a nem várt válasz és az internetkapcsolat hiánya is.

### Elvárt tech stack:
- Typescript
- Vite
- CSS framework / convention
- git, github

### Bónusz:
- Ne "kiabáljon" egyből a felület a hibás email miatt - csak ha már beírt valamit az adott inputmezőbe a user, és elkezdett valahova máshova is írni, akkor szóljon az előző hiba miatt.
- Folyamatosan segítsen a usernek a kliens, minden egyes leütött karakter után szóljon, hogy az adott email már foglalt e.