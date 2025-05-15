import React from 'react'

const LocationSearchPanel = ({
  suggestions,
  setPanelOpen,
  setVehiclePanel,
  setPickup,
  setDestination,
  activeField
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description || suggestion)
    } else if (activeField === 'destination') {
      setDestination(suggestion.description || suggestion)
    }

    // setPanelOpen(false)
    // setVehiclePanel(true)
  }

  return (
    <div className='p-4'>
      {suggestions.map((suggestion, index) => (
        <div
          key={index}
          onClick={() => handleSuggestionClick(suggestion)}
          className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
        >
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{suggestion.description}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
