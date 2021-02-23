export default function(deg) {
  if (deg > 11.25 && deg <= 33.75) {
    return 'Северо-Северо-Восточный'
  } else if (deg > 33.75 && deg <= 56.25) {
    return 'Восточно-Северо-Восточный'
  } else if (deg > 56.25 && deg <= 78.75) {
    return 'Восточный'
  } else if (deg > 78.75 && deg <= 101.25) {
    return 'Восточно-Южный'
  } else if (deg > 101.25 && deg <= 123.75) {
    return 'Восточно-Юго-Восточный'
  } else if (deg > 123.75 && deg <= 146.25) {
    return 'Северо-Восточный'
  } else if (deg > 146.25 && deg <= 168.75) {
    return 'Северо-Северо-Восточный'
  } else if (deg > 168.75 && deg <= 191.25) {
    return 'Южный'
  } else if (deg > 191.25 && deg <= 213.75) {
    return 'Юго-Северо-Западный'
  } else if (deg > 213.75 && deg <= 236.25) {
    return 'Юго-Восточный'
  } else if (deg > 236.25 && deg <= 258.75) {
    return 'Западный-Юго-Западный'
  } else if (deg > 258.75 && deg <= 281.25) {
    return 'Западный'
  } else if (deg > 281.25 && deg <= 303.75) {
    return 'Западный-Северо-Западный'
  } else if (deg > 303.75 && deg <= 326.25) {
    return 'Северо-Западный'
  } else if (deg > 326.25 && deg <= 348.75) {
    return 'Северо-Северо-Западный'
  } else {
    return 'Северный'
  }
}