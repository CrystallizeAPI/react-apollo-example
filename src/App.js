import React from 'react'
import { useQuery, gql } from '@apollo/client'

const CATALOGUE = gql`
  query {
    catalogue(language: "en", path: "/") {
      children {
        ...item
        ...product

        children {
          ...item
          ...product
        }
      }
    }
  }

  fragment item on Item {
    id
    name
    type
    path
  }

  fragment product on Product {
    id
    language
    vatType {
      name
      percent
    }
    isVirtual
    isSubscriptionOnly
    variants {
      id
      name
      sku
      price
      stock
      isDefault
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(CATALOGUE)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div className="App">
      <ul>
        {data.catalogue.children.map((item) => {
          if (item.type === 'folder' && item.children) {
            return (
              <li>
                {item.name}
                <ul>
                  {item.children.map((child) => (
                    <li>{child.name}</li>
                  ))}
                </ul>
              </li>
            )
          }

          return <li>{item.name}</li>
        })}
      </ul>
    </div>
  )
}

export default App
