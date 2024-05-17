import React from 'react'

interface CardProps {
  tag?: string
  metric?: string
  name?: string
  image?: string
  description?: string
}

export const Card = ({ tag, metric, name, image, description }: CardProps) => {
  return (
    <div className="flexCol">
      <h4>{tag}</h4>
      {image ? (
        <img src={image} />
      ) : (
        <div className="defaultImgThumbnail"></div>
      )}
      <h5>{name}</h5>
      <p>{metric}</p>
      <span>{description}</span>
    </div>
  )
}
