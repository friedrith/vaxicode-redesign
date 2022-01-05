<div align="center">
<h1 style="border: 0">Vaxicode Redesign</h1>
<img src="https://user-images.githubusercontent.com/4005226/144686496-fed286b7-3bc3-4aa9-ad81-840224b5a359.png" alt="sreenshot" />
<br>

</div>

This project is a redesign of the Vaxicode application, the Québec application to manage vaccinal passports.

It includes a lot of new features like:

- automatic brightness increase to make the QR codes easier to scan
- import vaccination passports from other countries
- better user experience

This project has been implemented with React Native and more specifically Expo. It also includes a system of Localization.

## Getting started

```bash
yarn
yarn start

```

## Technical details

### Qr code parsers

Our Qr code parsers are inspired from:

- french: https://github.com/manekinekko/digital-covid-certificate-decoder/blob/main/index.js
- quebec: https://github.com/obrassard/shc-extractorx

### React native

- [React native official website](https://reactnative.dev/docs/components-and-apis)
- [Expo components](https://docs.expo.dev/versions/latest/)
- https://wix.github.io/react-native-navigation/docs/sideMenu/
- [React native component library](https://reactnativeelements.com/docs/icon/)
- [Localization](https://docs.expo.dev/versions/v42.0.0/sdk/localization/)
- [other library for localization](https://necolas.github.io/react-native-web/docs/localization/)
- https://www.happyhues.co/palettes/4

## License

React is [MIT licensed](./LICENSE).
