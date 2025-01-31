import Select from './ui/select';

const categories = [
  { value: 'humidity', label: 'Humedad y Precipitación' },
  { value: 'evapotranspiration', label: 'Evapotranspiración' },
  { value: 'wind', label: 'Viento' },
  { value: 'pressure', label: 'Presión y Flujo de Calor' },
  { value: 'soil', label: 'Suelo' },
  { value: 'solar', label: 'Luz Solar y UV' },
  { value: 'snow', label: 'Nieve' },
];

function CategorySelector({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
      <Select options={categories} value={value} onChange={onChange} className="w-full" />
    </div>
  );
}

export default CategorySelector;
