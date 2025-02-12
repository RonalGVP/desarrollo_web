export const pestConditions = [
  {
    name: 'Mosquito',
    humidity: 70,
    temperature: 25,
    description: 'Los mosquitos proliferan con alta humedad y temperaturas cálidas.',
  },
  {
    name: 'Langosta',
    humidity: 40,
    temperature: 30,
    description: 'Las langostas se desarrollan en climas secos y cálidos.',
  },
  {
    name: 'Hongo Fusarium',
    humidity: 80,
    temperature: 20,
    description: 'Este hongo se propaga en ambientes húmedos y templados.',
  },
];

export function getPestInfo(humidity, temperature) {
  const humidityRange = { min: humidity - 10, max: humidity + 10 };
  const temperatureRange = { min: temperature - 5, max: temperature + 5 };

  return pestConditions.filter((pest) => {
    return (
      humidityRange.min <= pest.humidity && pest.humidity <= humidityRange.max &&
      temperatureRange.min <= pest.temperature && pest.temperature <= temperatureRange.max
    );
  });
}
