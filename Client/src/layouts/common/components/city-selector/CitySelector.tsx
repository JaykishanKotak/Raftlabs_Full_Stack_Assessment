import { Modal } from '@/components/ui/Modal';
import { useCitySelector } from './useCitySelector';

const CitySelector = () => {
  const { isOpen, setIsOpen, cityList, selectedCity, handleCitySelect } =
    useCitySelector();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:bg-brand-50/50"
      >
        <span className="text-brand-500 text-lg">📍</span>
        <span>{selectedCity}</span>
        <span className="text-[10px] text-slate-400">▼</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select your city"
      >
        <div className="grid grid-cols-2 gap-2">
          {cityList?.data.map((city: string) => (
            <button
              key={city}
              onClick={() => handleCitySelect(city)}
              className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                selectedCity === city
                  ? 'bg-brand-600 text-white shadow-brand-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default CitySelector;
