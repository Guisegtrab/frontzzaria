import React, { useState, useContext } from 'react'
import { AuthContext } from 'contexts/auth'
import t from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import {
  Card as MaterialCard,
  Container,
  Grid,
  Typography
} from '@material-ui/core'
import {
  CardLink,
  Divider,
  H4,
  HeaderContent,
  PizzasGrid,
  Content
} from 'ui'
import { singularOrPlural, toMoney } from 'utils'
import { HOME } from 'routes'

import pizzasFlavours from 'fake-data/pizzas-flavours.js'

const ChoosePizzaFlavours = ({ location }) => {
  const [checkboxes, setCheckboxes] = useState(() => ({}))
  const { userInfo } = useContext(AuthContext)
  console.log('userInfo', userInfo)

  if (!location.state) {
    return <Redirect to={HOME} />
  }

  const { flavours, id, name, slices } = location.state

  const handleChangeCheckbox = (pizzaId) => (e) => {
    console.log('checkboxes', checkboxes)
    if (
      checkboxesChecked(checkboxes).length === flavours &&
      e.target.checked === true
    ) {
      return
    }

    setCheckboxes((checkboxes) => {
      return {
        ...checkboxes,
        [pizzaId]: e.target.checked
      }
    })
  }

  return (
    <Content>
      <HeaderContent>
        <H4>
          Escolha até {flavours} {' '}
          {singularOrPlural(flavours, 'sabor', 'sabores')}:
        </H4>
      </HeaderContent>

      <PizzasGrid>
        {pizzasFlavours.map((pizza) => (
          <Grid item key={pizza.id} xs>
            <Card checked={!!checkboxes[pizza.id]}>
              <Label>
                <Checkbox
                  checked={!!checkboxes[pizza.id]}
                  onChange={handleChangeCheckbox(pizza.id)}
                />

                <Img src={pizza.image} alt={pizza.name} />

                <Divider />

                <Typography>{pizza.name}</Typography>
                <Typography variant='h5'>
                  {toMoney(pizza.value[id])}
                </Typography>
              </Label>
            </Card>
          </Grid>
        ))}
      </PizzasGrid>

      <Footer>
        <Container>
          <Grid container>
            <OrderContainer>
              <typography>
                <b>{userInfo.user.email}, seu pedido é: </b>
              </typography>

              <typography>
                <b>Pizza <b>{name.toUpperCase()}</b> { '-' }
                {slices} {singularOrPlural(slices, 'fatia', 'fatias')}, {flavours} {singularOrPlural(flavours, 'sabor', 'sabores')}</b>
              </typography>
            </OrderContainer>

            <Grid item>
              Botão
            </Grid>
          </Grid>
        </Container>
      </Footer>
    </Content>
  )
}

ChoosePizzaFlavours.propTypes = {
  location: t.object.isRequired
}

function checkboxesChecked (checkboxes) {
  return Object.values(checkboxes).filter(Boolean)
}

const Card = styled(MaterialCard)`
  && {
    border: 2px solid transparent;
    border-color: ${({ theme, checked }) => checked ? theme.palette.secondary.light : ''};
  }`

const Label = styled(CardLink).attrs({
  component: 'label'
})``

const Checkbox = styled.input.attrs({
  type: 'checkbox'
})`
      display: none;
    `

const Img = styled.img`
      width: 200px;
    `

const Footer = styled.footer`
      box-shadow: ${({ theme }) => theme.palette.grey[400]};
      padding: ${({ theme }) => theme.spacing(3)}px;
      width: 100%;
    `

const OrderContainer = styled(Grid).attrs({
  item: true
})`
  && {
    flex-grow: 1;
 }
`

export default ChoosePizzaFlavours
