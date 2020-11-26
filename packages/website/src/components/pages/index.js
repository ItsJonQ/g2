import { Container, View } from "@wp-g2/components"
import { ui } from "@wp-g2/styles"
import React from "react"

export const Section = ({ children, css }) => {
  return (
    <View css={[{ minHeight: "80vh" }, ui.padding.y(30), css]}>
      <Container width={880}>{children}</Container>
    </View>
  )
}
