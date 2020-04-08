# podcast-helper
En Vue-app for å gjøre det lettere å legge til nye programmer i [`manual_changes.json`](https://github.com/Studentmediene/podkast.radiorevolt.no/blob/master/src/show_processors/manual_changes.json) i Radio Revolts podkastsystem, [`podkast.radiorevolt.no`](https://github.com/Studentmediene/podkast.radiorevolt.no).

## Funksjonalitet:
- Automatisk generering av JSON til podkastsystemet basert på et skjema
- Automatisk henting av navn og Digas-ID for aktive programmer
- Preview av podkast-bilde
- Forhåndsdefinerte podkastkategorier, basert på @tobinus sitt `python-podgen` repo

## Teknologier:
- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/en/) (Google Material design components for Vue)

## Hvordan kjøre lokalt:
Krever at `npm` er installert
## Oppsett
```
npm install
```

### Kompiler og hot-reload for utvikling
```
npm run serve
```

### Kompilering og komprimering for produksjon
```
npm run build
```

### Linting og fiksing av filer
```
npm run lint
```
