import "../styles/index.css"

import {
  Card,
  CardBody,
  Heading,
  HStack,
  Spacer,
  Surface,
  Text,
  View,
  VStack,
} from "@wp-g2/components"
import { createTheme, keyframes, ThemeProvider, ui } from "@wp-g2/styles"
import React from "react"

import { Logo } from "../components"
import { Section } from "../components/pages"
import CodeMap from "../images/g2-code-map"
import Layout from "../layouts/Base"

const Heading1 = props => (
  <Heading letterSpacing="-0.015em" size="5em" weight={700} {...props} />
)
const Heading2 = props => <Heading1 size="4.5em" {...props} />
const Heading3 = props => <Heading1 size="4em" {...props} />
const Heading4 = props => <Heading1 size="3em" {...props} />

const GlassCard = ({
  css,
  children,
  height,
  label,
  width,
  padding = ui.space(5),
}) => {
  return (
    <Card
      className="GlassCard"
      css={[
        {
          background: "rgba(56, 88, 233, 0.06)",
          boxShadow: "0 0 0 1px rgba(56, 88, 233, 0.2)",
          color: ui.get("colorAdmin"),
          width,
          height,
          padding,
        },
        label && ui.padding.top(7),
        ui.position.relative,
        css,
      ]}
      elevation={3}
    >
      {label && (
        <View
          css={[
            ui.position.topLeft,
            ui.offset({ x: 20, y: 10 }),
            ui.opacity(0.3),
          ]}
        >
          <Text color="currentColor" isBlock size={6} upperCase>
            {label}
          </Text>
        </View>
      )}

      {children}
    </Card>
  )
}

const FadeIn = ({ children }) => {
  const [fade, setFade] = React.useState(false)

  React.useEffect(() => {
    requestAnimationFrame(() => {
      setFade(true)
    })
  })

  const staggered = Array.from(Array(10).keys())
    .map(
      (_, index) => `
    *:nth-child(${index}) {
      transition-delay: ${index * 200}ms;
    }
  `
    )
    .join("\n")

  const classes = [
    `
      * {
        opacity: 0;
        transition: opacity 300ms linear;
      }
    `,
    staggered,
  ]

  const fadeIn = ui.css`
  * {
    opacity: 1;
  }
  `

  return <View css={[...classes, fade && fadeIn]}>{children}</View>
}

const theme = createTheme(() => {
  return {
    colorAdmin: "#3858E9",
    fontSize: "20px",
    fontWeight: 500,
    fontWeightHeading: 600,
    cardBorderRadius: "12px",
  }
})

const GradientText = props => {
  return (
    <View
      as="span"
      css={`
        background: linear-gradient(
          to right,
          rgb(241, 77, 151),
          rgb(56, 88, 233)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-size: inherit;
      `}
      {...props}
    />
  )
}

export default function IndexPage() {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <Section css={[ui.font.alignment.center]}>
          <FadeIn>
            <Spacer mb={20}>
              <HStack alignment="center">
                <Logo size={160} />
              </HStack>
            </Spacer>
            <Heading size={2} variant="muted">
              WordPress Components
            </Heading>
            <Heading1>
              <GradientText>Reimagined.</GradientText>
            </Heading1>
            <Spacer />
            <Text variant="muted">Hello</Text>
          </FadeIn>
        </Section>

        <ThemeProvider isDark>
          <Surface variant="tertiary">
            <Section>
              <FadeIn>
                <Heading3>
                  System of
                  <br />
                  Systems.
                </Heading3>
                <Text variant="muted">Hello</Text>
                <View
                  css={[
                    {
                      boxShadow: ui.flow(
                        ["0 40px 200px -60px rgba(56,88,233,1)"],
                        ["-35px -40px 80px -60px rgba(241,77,151,1)"],
                        ["0 0 0px 1px rgba(255,255,255,0.1)"],
                        ["0 0 10px 0px rgba(255,255,255,0.3)"]
                      ),
                      color: "#191919",
                    },
                    `
                    transition: color 3000ms ease-out !important;

                    &:hover {
                      color: #444;
                    }
                  `,
                    ui.padding(2),
                    `path { fill: currentColor}`,
                  ]}
                >
                  <CodeMap />
                </View>
              </FadeIn>
            </Section>
          </Surface>
        </ThemeProvider>

        <Section>
          <Heading3>
            Modular
            <br />
            By Design.
          </Heading3>
          <View
            css={`
              perspective: 5000px;
              perspective-origin: left bottom;

              > * {
                transform: rotateY(40deg) rotateX(30deg);
              }

              * {
                transition: transform 3000ms ease-out;
              }

              &:hover {
                > * {
                  transform: rotateY(0deg) rotateX(0deg);
                }
                .GlassCard {
                  transform: translate(0, 0);
                }
              }
            `}
          >
            <GlassCard label="Card" width={480}>
              <GlassCard css={[ui.offset({ x: 10, y: -10 })]} label="VStack">
                <VStack>
                  <GlassCard
                    css={[ui.offset({ x: 10, y: -10 }, ui.opacity(0.3))]}
                    label="TextInput"
                  >
                    <Text color="currentColor" css={[ui.opacity(0.5)]}>
                      Placeholder
                    </Text>
                  </GlassCard>
                  <GlassCard
                    css={[ui.offset({ x: 30, y: -30 })]}
                    label="TextInput"
                  >
                    <Text color="currentColor" css={[ui.opacity(0.5)]}>
                      Placeholder
                    </Text>
                  </GlassCard>
                  <GlassCard
                    css={[
                      ui.padding.y(2),
                      ui.padding.x(5),
                      ui.font.alignment.center,
                      ui.offset({ x: 50, y: -50 }),
                    ]}
                  >
                    <Text color="currentColor">Button</Text>
                  </GlassCard>
                </VStack>
              </GlassCard>
            </GlassCard>
          </View>
        </Section>

        <Section>
          <Heading3>
            Core
            <br />
            Accessibility.
          </Heading3>
          <Text variant="muted">Hello</Text>
        </Section>

        <Section>
          <Heading3>
            <GradientText>Themable.</GradientText>
          </Heading3>
          <Text variant="muted">Hello</Text>
        </Section>

        <Section>
          <Heading3>Super fast.</Heading3>
          <Text variant="muted">Hello</Text>
        </Section>
      </ThemeProvider>
    </Layout>
  )
}
