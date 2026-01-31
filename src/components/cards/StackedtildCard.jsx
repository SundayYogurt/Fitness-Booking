import React from 'react'

const StackedtildCard = ({fitnessClass}) => {
  return (
    <div className="relative w-100 h-75  md:h-55 md: ml-30">
  {fitnessClass.map((item, index) => (
    <div
      key={item.id}
      className={`
        absolute top-0 left-0 w-full h-full
        rounded-xl bg-white shadow-lg
        transition-all duration-300 cursor-pointer
        hover:scale-105 hover:shadow-2xl
      `}
      style={{
        transform: `
          translateY(${index * 12}px)
          translateX(${index * 12}px)
          rotate(${index * -3}deg)
        `,
        zIndex: 10 - index,
      }}
    >
      <img
        src={item.image}
        className="w-full h-full object-cover rounded-xl"
      />
    </div>
  ))}
</div>

  )
}

export default StackedtildCard