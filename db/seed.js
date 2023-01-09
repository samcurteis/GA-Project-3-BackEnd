import { connectDb, disconnectDb } from "./helpers.js";
import User from "../models/user.js";
import Country from "../models/country.js";
import Entry from "../models/entry.js";

const countries = [
  { name: "Antarctica", code: "XX" },
  { name: "Angola", code: "AO" },
  { name: "Burundi", code: "BI" },
  { name: "Benin", code: "BJ" },
  { name: "Burkina Faso", code: "BF" },
  { name: "French Southern and Antarctic Lands", code: "XX" },
  { name: "Botswana", code: "BW" },
  { name: "Central African Republic", code: "CF" },
  { name: "Ivory Coast", code: "CI" },
  { name: "Cameroon", code: "CM" },
  { name: "Democratic Republic of the Congo", code: "CD" },
  { name: "Republic of Congo", code: "CG" },
  { name: "Comoros", code: "KM" },
  { name: "Cape Verde", code: "CV" },
  { name: "Djibouti", code: "DJ" },
  { name: "Algeria", code: "DZ" },
  { name: "Egypt", code: "EG" },
  { name: "Eritrea", code: "ER" },
  { name: "Spain", code: "ES" },
  { name: "Ethiopia", code: "ET" },
  { name: "Gabon", code: "GA" },
  { name: "Ghana", code: "GH" },
  { name: "Guinea", code: "GN" },
  { name: "Gambia", code: "GM" },
  { name: "Equatorial Guinea", code: "GQ" },
  { name: "Guinea Bissau", code: "GW" },
  { name: "Kenya", code: "KE" },
  { name: "Liberia", code: "LR" },
  { name: "Libya", code: "LY" },
  { name: "Lesotho", code: "LS" },
  { name: "Morocco", code: "MA" },
  { name: "Madagascar", code: "MG" },
  { name: "Mali", code: "ML" },
  { name: "Mozambique", code: "MZ" },
  { name: "Mauritania", code: "MR" },
  { name: "Malawi", code: "MW" },
  { name: "Mayotte", code: "YT" },
  { name: "Namibia", code: "NA" },
  { name: "Niger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Madeira", code: "PT" },
  { name: "Rwanda", code: "RW" },
  { name: "Western Sahara", code: "EH" },
  { name: "Sudan", code: "SD" },
  { name: "South Sudan", code: "SS" },
  { name: "Senegal", code: "SN" },
  { name: "Sierra Leone", code: "SL" },
  { name: "Somaliland", code: "XX" },
  { name: "Puntland", code: "XX" },
  { name: "Somalia", code: "SO" },
  { name: "Sao Tome and Principe", code: "XX" },
  { name: "Swaziland", code: "SZ" },
  { name: "Chad", code: "TD" },
  { name: "Togo", code: "TG" },
  { name: "Tunisia", code: "TN" },
  { name: "Tanzania", code: "TZ" },
  { name: "Zanzibar", code: "XX" },
  { name: "Uganda", code: "AE" },
  { name: "South Africa", code: "ZA" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
  { name: "Afghanistan", code: "AF" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "Armenia", code: "AM" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bangladesh", code: "BD" },
  { name: "Bahrain", code: "BH" },
  { name: "Brunei", code: "BN" },
  { name: "Bhutan", code: "BT" },
  { name: "Cocos (Keeling) Islands", code: "XX" },
  { name: "China", code: "CN" },
  { name: "Cyprus No Mans Area", code: "XX" },
  { name: "Christmas Island", code: "CX" },
  { name: "Northern Cyprus", code: "TR" },
  { name: "Cyprus", code: "CY" },
  { name: "Dhekelia Sovereign Base Area", code: "XX" },
  { name: "Gaza", code: "XX" },
  { name: "Ajaria", code: "XX" },
  { name: "Georgia", code: "GE" },
  { name: "Hong Kong S.A.R.", code: "HK" },
  { name: "Indonesia", code: "ID" },
  { name: "India", code: "IN" },
  { name: "Iraqi Kurdistan", code: "IQ" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Israel", code: "IL" },
  { name: "Jordan", code: "JO" },
  { name: "Japan", code: "JP" },
  { name: "Baykonur Cosmodrome", code: "XX" },
  { name: "Siachen Glacier", code: "XX" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Cambodia", code: "KH" },
  { name: "Korean Demilitarized Zone (south)", code: "XX" },
  { name: "Korean Demilitarized Zone (north)", code: "XX" },
  { name: "South Korea", code: "KR" },
  { name: "Kuwait", code: "KW" },
  { name: "Laos", code: "LA" },
  { name: "Lebanon", code: "LB" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Macao S.A.R", code: "MO" },
  { name: "Myanmar", code: "MM" },
  { name: "Mongolia", code: "MN" },
  { name: "Malaysia", code: "MY" },
  { name: "Nepal", code: "NP" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "Pakistan" },
  { name: "Paracel Islands", code: "XX" },
  { name: "Spratly Islands", code: "XX" },
  { name: "Philippines", code: "PH" },
  { name: "North Korea", code: "KP" },
  { name: "Qatar", code: "QA" },
  { name: "Russia", code: "RU" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Scarborough Reef", code: "XX" },
  { name: "Singapore", code: "SG" },
  { name: "UNDOF", code: "XX" },
  { name: "Syria", code: "SY" },
  { name: "Thailand", code: "TH" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Turkmenistan", code: "TM" },
  { name: "East Timor", code: "TL" },
  { name: "Turkey", code: "TR" },
  { name: "Taiwan", code: "TW" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Vietnam", code: "VN" },
  { name: "West Bank", code: "XX" },
  { name: "Akrotiri Sovereign Base Area", code: "XX" },
  { name: "Yemen", code: "YE" },
  { name: "Albania", code: "AL" },
  { name: "Aland", code: "AX" },
  { name: "Andorra", code: "AD" },
  { name: "Austria", code: "AT" },
  { name: "BrusselsCapitalRegion", code: "XX" },
  { name: "FlemishRegion", code: "XX" },
  { name: "Bulgaria", code: "BG" },
  { name: "BosniaandHerzegovina", code: "BA" },
  { name: "RepublicSrpska", code: "XX" },
  { name: "Belarus", code: "BY" },
  { name: "WalloonRegion", code: "XX" },
  { name: "Switzerland", code: "CH" },
  { name: "CzechRepublic", code: "CZ" },
  { name: "Germany", code: "DE" },
  { name: "Denmark", code: "DK" },
  { name: "England", code: "GB" },
  { name: "Estonia", code: "EE" },
  { name: "Finland", code: "FI" },
  { name: "FaroeIslands", code: "XX" },
  { name: "France", code: "FR" },
  { name: "Guernsey", code: "XX" },
  { name: "Gibraltar", code: "GI" },
  { name: "Greece", code: "GR" },
  { name: "Croatia", code: "HR" },
  { name: "Hungary", code: "HU" },
  { name: "IsleofMan", code: "XX" },
  { name: "Ireland", code: "IR" },
  { name: "Iceland", code: "IS" },
  { name: "Italy", code: "IT" },
  { name: "Jersey", code: "XX" },
  { name: "Kosovo", code: "XX" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Latvia", code: "LV" },
  { name: "Monaco", code: "MC" },
  { name: "Moldova", code: "MD" },
  { name: "Macedonia", code: "MK" },
  { name: "Malta", code: "MT" },
  { name: "Montenegro", code: "ME" },
  { name: "NorthernIreland", code: "XX" },
  { name: "JanMayen", code: "XX" },
  { name: "Netherlands", code: "NL" },
  { name: "Norway", code: "NO" },
  { name: "Svalbard", code: "XX" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Romania", code: "RO" },
  { name: "Scotland", code: "XX" },
  { name: "SanMarino", code: "SM" },
  { name: "Serbia", code: "RS" },
  { name: "Vojvodina", code: "XX" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Sweden", code: "SE" },
  { name: "Ukraine", code: "UA" },
  { name: "Vatican", code: "VA" },
  { name: "Wales", code: "XX" },
  { name: "Aruba", code: "XX" },
  { name: "Antigua", code: "AG" },
  { name: "Barbuda", code: "XX" },
  { name: "Anguilla", code: "XX" },
  { name: "The Bahamas", code: "BS" },
  { name: "Bajo Nuevo Bank (Petrel Is.)", code: "XX" },
  { name: "Saint Barthelemy", code: "XX" },
  { name: "Belize", code: "BZ" },
  { name: "Bermuda", code: "XX" },
  { name: "Navassa Island", code: "XX" },
  { name: "Barbados", code: "BB" },
  { name: "Canada", code: "CA" },
  { name: "Costa Rica", code: "CR" },
  { name: "Cuba", code: "CU" },
  { name: "Curacao", code: "XX" },
  { name: "Cayman Islands", code: "XX" },
  { name: "Dominica", code: "DM" },
  { name: "Dominican Republic", code: "DO" },
  { name: "Guadeloupe", code: "GP" },
  { name: "Grenada", code: "GD" },
  { name: "Greenland", code: "GL" },
  { name: "Guatemala", code: "GT" },
  { name: "Honduras", code: "HN" },
  { name: "Haiti", code: "HT" },
  { name: "Jamaica", code: "JM" },
  { name: "Saint Kitts and Nevis", code: "KN" },
  { name: "Saint Lucia", code: "LC" },
  { name: "Saint Martin", code: "XX" },
  { name: "Mexico", code: "MX" },
  { name: "Montserrat", code: "XX" },
  { name: "Martinique", code: "MQ" },
  { name: "Nicaragua", code: "NI" },
  { name: "Caribbean Netherlands", code: "XX" },
  { name: "Panama", code: "PA" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Serranilla Bank", code: "XX" },
  { name: "El Salvador", code: "SV" },
  { name: "Saint Pierre and Miquelon", code: "XX" },
  { name: "Sint Maarten", code: "XX" },
  { name: "Turks and Caicos Islands", code: "XX" },
  { name: "Trinidad and Tobago", code: "TT" },
  { name: "United States", code: "US" },
  { name: "US Naval Base Guantanamo Bay", code: "XX" },
  { name: "Saint Vincent and the Grenadines", code: "VC" },
  { name: "British Virgin Islands", code: "VG" },
  { name: "United States Virgin Islands", code: "VI" },
  { name: "American Samoa", code: "XX" },
  { name: "Australia", code: "AU" },
  { name: "Chile", code: "CL" },
  { name: "Cook Islands", code: "XX" },
  { name: "Coral Sea Islands", code: "XX" },
  { name: "Jarvis Island", code: "XX" },
  { name: "Fiji", code: "FJ" },
  { name: "Baker Island", code: "XX" },
  { name: "Federated States of Micronesia", code: "FM" },
  { name: "Guam", code: "XX" },
  { name: "Howland Island", code: "XX" },
  { name: "Johnston Atoll", code: "XX" },
  { name: "Kiribati", code: "KI" },
  { name: "Marshall Islands", code: "MH" },
  { name: "Northern Mariana Islands", code: "XX" },
  { name: "Midway Islands", code: "XX" },
  { name: "New Caledonia", code: "NC" },
  { name: "Norfolk Island", code: "XX" },
  { name: "Niue", code: "XX" },
  { name: "Nauru", code: "NR" },
  { name: "New Zealand", code: "NZ" },
  { name: "Pitcairn Islands", code: "XX" },
  { name: "Palau", code: "PW" },
  { name: "Bougainville", code: "XX" },
  { name: "Papua New Guinea", code: "PG" },
  { name: "French Polynesia", code: "PF" },
  { name: "Solomon Islands", code: "SB" },
  { name: "Tokelau", code: "XX" },
  { name: "Tonga", code: "TO" },
  { name: "Tuvalu", code: "TV" },
  { name: "Vanuatu", code: "VU" },
  { name: "Wallis and Futuna", code: "XX" },
  { name: "Wake Atoll", code: "XX" },
  { name: "Samoa", code: "WS" },
  { name: "Argentina", code: "AR" },
  { name: "Bolivia", code: "BO" },
  { name: "Brazil", code: "BR" },
  { name: "Colombia", code: "CO" },
  { name: "Ecuador", code: "EC" },
  { name: "Falkland Islands", code: "XX" },
  { name: "French Guiana", code: "XX" },
  { name: "Guyana", code: "GY" },
  { name: "Peru", code: "PE" },
  { name: "Paraguay", code: "PY" },
  { name: "Suriname", code: "SR" },
  { name: "Uruguay", code: "UY" },
  { name: "Venezuela", code: "VE" },
  { name: "Belgium", code: "BE" },
  { name: "Cote d'Ivoire", code: "CI" },
  { name: "Djibouti", code: "DJ" },
  { name: "Northern Mariana Islands", code: "MP" },
  { name: "Seychelles", code: "SC" },
  { name: "Sao Tome and Princ.", code: "ST" },
  { name: "Réunion", code: "RE" },
  { name: "Palestinian Territories", code: "PS" },
  { name: "Mauritius", code: "MU" },
  { name: "Maldives", code: "MV" },
  { name: "Wales", code: "GB" },
  { name: "Scotland", code: "GB" },
];

const SAM = {
  username: "firemansam",
  password: "Password!1",
  email: "sam@sam.com",
  isAdmin: true,
};
const NATHAN = {
  username: "natedawg",
  password: "Password!1",
  email: "nathan@nathan.com",
  isAdmin: true,
};
const JET = {
  username: "Jet",
  password: "Password!1",
  email: "jet@jet.com",
  isAdmin: true,
};
const ADMIN_USER = {
  username: "admin",
  password: "Password!1",
  email: "admin@admin.com",
  isAdmin: true,
};
const NON_ADMIN_USER = {
  username: "nonadmin",
  password: "Password!1",
  email: "nonadmin@nonadmin.com",
};

// *** DROP DB ***
async function db() {
  console.log("connection to mongo db");
  await connectDb();
  console.log("successful connection to mongodb");

  console.log("deleting countries");
  await Country.deleteMany({});
  console.log("successfully deleted countries");

  console.log("deleting entries");
  await Entry.deleteMany({});
  console.log("deleted entries");

  console.log("deleting users");
  await User.deleteMany();
  console.log("successfully deleted users");

  // *** CREATING USERS ***
  console.log("creating user");
  const [user, adminUser] = await User.create([NON_ADMIN_USER, ADMIN_USER]);
  //TODO: only when schema done
  const [sam, nathan, jet] = await User.create([SAM, NATHAN, JET]);
  console.log("created users");

  // countries.forEach((country) => {
  //   console.log("creating", country);
  //   Country.create(country);
  //   console.log("done", country);
  // });

  console.log("creating countries");
  Country.create(countries);
  console.log("countries created");

  console.log("Creating test country one");
  const testCountryOne = await Country.create({
    name: "TestCountryOne",
    code: "TC",
  });
  console.log("Created test country one");
  console.log("Creating test country two");
  const testCountryTwo = await Country.create({
    name: "TestCountryTwo",
    code: "TC",
  });
  console.log("Created test country two");
  console.log("Creating test country three");
  const testCountryThree = await Country.create({
    name: "TestCountryThree",
    code: "TC",
  });
  console.log("Created test country three");
  console.log("Creating test country four");
  const testCountryFour = await Country.create({
    name: "TestCountryFour",
    code: "TC",
  });
  console.log("Created test country four");

  const testEntries = [
    {
      country: testCountryOne._id,
      text: "Bloody great",
      addedBy: sam._id,
    },
    {
      country: testCountryTwo._id,
      text: "Just fab",
      addedBy: nathan._id,
    },
    {
      country: testCountryThree._id,
      text: "A hoot",
      addedBy: jet._id,
    },
    {
      country: testCountryFour._id,
      text: "10/10 would visit again",
      addedBy: adminUser._id,
    },
  ];
  console.log("Creating test entry one");
  const testEntryOne = await Entry.create(testEntries[0]);
  await Country.findOneAndUpdate(
    { _id: testCountryOne._id },
    { $push: { entries: testEntryOne._id } }
  );

  await User.findOneAndUpdate(
    { _id: testEntryOne.addedBy },
    { $push: { entries: testEntryOne._id } }
  );
  console.log("Successfully created one");

  console.log("Creating test entrThreewo");
  const testEntryTwo = await Entry.create(testEntries[1]);
  await Country.findOneAndUpdate(
    { _id: testCountryTwo._id },
    { $push: { entries: testEntryTwo._id } }
  );

  await User.findOneAndUpdate(
    { _id: testEntryTwo.addedBy },
    { $push: { entries: testEntryTwo._id } }
  );
  console.log("Successfully created two");

  console.log("Creating test entry three");
  const testEntryThree = await Entry.create(testEntries[2]);
  await Country.findOneAndUpdate(
    { _id: testCountryThree._id },
    { $push: { entries: testEntryThree._id } }
  );

  await User.findOneAndUpdate(
    { _id: testEntryThree.addedBy },
    { $push: { entries: testEntryThree._id } }
  );
  console.log("Successfully created three");

  console.log("Creating test entry four");
  const testEntryFour = await Entry.create(testEntries[3]);
  await Country.findOneAndUpdate(
    { _id: testCountryFour._id },
    { $push: { entries: testEntryFour._id } }
  );

  await User.findOneAndUpdate(
    { _id: testEntryFour.addedBy },
    { $push: { entries: testEntryFour._id } }
  );
  console.log("Successfully created four");

  await disconnectDb();
  console.log("successfully disconnected from mongodb");
}

// creating countries
// for (const country of countries) {
//   console.log("creating", country);
//   console.log(typeof country);

//   Country.create({ name: country });
//   console.log("done", country);
// }

// await Country.create(countries, (error, createdCountries) => {
//   if(e){
//     console.log(error);
//   }
// });

db();
