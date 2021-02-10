import {
  Button,
  Card,
  CardBody,
  DropdownMenuCard,
  FormGroup,
  Grid,
  Heading,
  HStack,
  Link,
  MenuItem,
  Spacer,
  Surface,
  Switch,
  Text,
  TextInput,
  View,
  VStack,
  ZStack,
} from "@wp-g2/components"
import { createTheme, getBreakpoint, ThemeProvider, ui } from "@wp-g2/styles"
import React from "react"

import { Logo, SEO } from "../components"
import {
  CopyText,
  FadeIn,
  GlassCard,
  GradientText,
  Heading1,
  Heading3,
  Section,
} from "../components/pages"
import CodeMap from "../images/g2-code-map"
import Layout from "../layouts/Base"

let themeData

const theme = createTheme(({ get, theme }) => {
  themeData = theme
  return {
    ...theme,
    buttonControlActiveStateColor: get("colorText"),
    cardBorderRadius: "12px",
    controlBorderRadius: "8px",
    colorAdmin: "#3858E9",
    controlBorderColor: get("colorText"),
    controlBorderColorHover: get("colorText"),
    controlBorderColorSubtle: "transparent",
    controlHeight: "36px",
    fontLineHeightBase: 1.6,
    fontWeight: 500,
    fontWeightHeading: 600,
    menuItemHeight: "32px",
    sliderThumbBackgroundColor: get("colorAdmin"),
    sliderThumbBorderColor: "transparent",
    sliderThumbBoxShadow: "none",
    switchPaddingOffset: "8px",
  }
})

const IntroSection = () => {
  return (
    <Section css={[ui.font.alignment.center]} pb={50} py={10}>
      <FadeIn>
        <Spacer mb={12}>
          <HStack alignment="center">
            <Logo size={120} />
          </HStack>
        </Spacer>
        <Heading size={3}>WordPress Components</Heading>
        <Heading1>
          <GradientText>Reimagined.</GradientText>
        </Heading1>
        <Spacer mb={6}>
          <CopyText>
            <Text>
              A from-scratch reimagining of Gutenberg's user interface. Designed
              to accommodate the ever-growing and ever-expressive needs of the
              Editor and the Platform.
            </Text>
          </CopyText>
        </Spacer>

        <Spacer mb={12}>
          <Button as="span" disabled isControl isRounded>
            Coming Soon
          </Button>
        </Spacer>

        <HStack alignment="center">
          <View>
            <Button href="/components/" size="large">
              Documentation
            </Button>
          </View>
          <View>
            <Button
              href="https://g2components.wordpress.com/"
              size="large"
              variant="primary"
            >
              Learn More
            </Button>
          </View>
        </HStack>
      </FadeIn>
    </Section>
  )
}

const SystemsSection = () => {
  return (
    <ThemeProvider isDark>
      <Surface variant="tertiary">
        <Section
          css={`
            &:hover {
              .Visual {
                color: #444;
              }
            }
          `}
          pb={30}
        >
          <FadeIn>
            <Heading3>
              A system of
              <br />
              systems.
            </Heading3>

            <Spacer mb={10}>
              <Text>
                Composed of a series of specialized systems. Systems designed to
                handle accessibility, context-awareness, styling, theming,
                animations, gestures, state management, and more. All working in
                harmony to form the foundations of this reimagined UI layer.
              </Text>
            </Spacer>

            <View
              aria-hidden
              className="Visual"
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
  )
}

const ModularSection = () => {
  return (
    <Section
      css={`
        &:hover {
          .Visual > * {
            transform: rotateY(0deg) rotateX(0deg);
          }
          .GlassCard {
            transform: translate(0, 0);
          }
        }
      `}
      py={40}
    >
      <Heading3>
        Modular
        <br />
        by design.
      </Heading3>
      <Grid columns={[1, 1, 2]} gap={8}>
        <View>
          <VStack spacing={6}>
            <Text>
              An extensive collection of modular components. Create richer
              experiences by combining components together.
            </Text>
            <Text>
              G2 is powered by a custom{" "}
              <Link
                href="https://g2components.wordpress.com/2020/08/31/creating-a-style-system/"
                target="_blank"
              >
                Style System
              </Link>
              . Designed to work out-of-the-box, in any React environment. No
              setup necessary.
            </Text>
          </VStack>
        </View>
        <View css={[ui.offset.y(-40), ui.padding(10), { overflow: "hidden" }]}>
          <View
            aria-hidden
            className="Visual"
            css={`
              perspective: 5000px;
              perspective-origin: left bottom;
              user-select: none;
              pointer-events: none;

              > * {
                transform: rotateY(40deg) rotateX(30deg);
              }

              * {
                transition: transform 3000ms ease-out;
              }
            `}
          >
            <GlassCard label="Card">
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
        </View>
      </Grid>
    </Section>
  )
}

const AccessiblitySection = () => {
  const [dark, setDark] = React.useState(false)
  const [highContrast, setHighContrast] = React.useState(false)

  return (
    <Section pb={30}>
      <Heading3>
        <br />
        Accessible
        <br />
        by default.
      </Heading3>
      <Spacer mb={10}>
        <Text>
          Built on top of{" "}
          <Link href="https://reakit.io/" target="_blank">
            Reakit
          </Link>
          , G2 provides strict <strong>WAI-ARIA 1.1</strong> standards from a
          core level. G2 also accomodates visual accessibility with built-in
          modes for dark, high-contrast, color-blind, and reduced motion.
        </Text>
      </Spacer>
      <ThemeProvider isDark={dark} isHighContrast={highContrast}>
        <Surface
          css={[ui.padding(10), { borderRadius: 20, overflow: "hidden" }]}
        >
          <View aria-hidden css={[ui.position.relative, ui.padding.bottom(20)]}>
            <View
              css={[
                ui.position.bottom,
                { right: "50%", transform: "translateX(60%)" },
                ui.zIndex(3),
              ]}
            >
              <ThemeProvider isDark>
                <Card elevation={8}>
                  <CardBody>
                    <Text>Two, menu item menu Accessible Dropdown 3 items</Text>
                  </CardBody>
                </Card>
              </ThemeProvider>
            </View>
            <ThemeProvider
              theme={{
                colorAdmin: "#3858E9",
                cardBorderRadius: "4px",
                buttonPrimaryColor: "#3858E9",
                buttonPrimaryBorderColor: "#3858E9",
                menuItemFocusBorderColor: "#3858E9",
                menuItemFocusTextColor: "#3858E9",
                fontSize: "13px",
              }}
            >
              <View
                aria-hidden
                css={[
                  ui.scale(1.2),
                  { display: "inline-block" },
                  { transformOrigin: "top left", pointerEvents: "none" },
                ]}
                disabled
              >
                <Button
                  as="span"
                  css={`
                    pointer-events: none;
                  `}
                  tabIndex={-1}
                  variant="primary"
                >
                  Dropdown
                </Button>
                <DropdownMenuCard css={[ui.margin.top(1), ui.frame.width(300)]}>
                  <View>
                    <MenuItem isSelected>One</MenuItem>
                    <MenuItem
                      css={[
                        {
                          background: ui.get("controlBackgroundBrightColor"),
                          borderColor: ui.get("surfaceBorderColor"),
                        },
                      ]}
                    >
                      Two
                    </MenuItem>
                    <MenuItem>Three</MenuItem>
                  </View>
                </DropdownMenuCard>
              </View>
            </ThemeProvider>
          </View>
        </Surface>
      </ThemeProvider>
      <Spacer mt={8}>
        <Grid columns={[2, 3]}>
          <FormGroup label="Dark Mode">
            <Switch onChange={setDark} size="large" value={dark} />
          </FormGroup>
          <FormGroup label="High Contrast Mode">
            <Switch
              onChange={setHighContrast}
              size="large"
              value={highContrast}
            />
          </FormGroup>
        </Grid>
      </Spacer>
    </Section>
  )
}

const ExampleCard = ({ elevation = 5, ...props }) => {
  return (
    <View {...props}>
      <ThemeProvider theme={{ cardPadding: ui.space(4), fontSize: "13px" }}>
        <Card
          css={[
            ui.frame.width(300),
            { pointerEvents: "none", userSelect: "none" },
          ]}
          elevation={elevation}
        >
          <CardBody>
            <VStack>
              <Heading size={5}>Card</Heading>
              <FormGroup label="Text Input">
                <TextInput placeholder="Placeholder" tabIndex={-1} />
              </FormGroup>
              <FormGroup label="Text Input">
                <TextInput placeholder="Placeholder" tabIndex={-1} />
              </FormGroup>
              <Spacer />
              <Button isBlock tabIndex={-1} variant="primary">
                Button
              </Button>
            </VStack>
          </CardBody>
        </Card>
      </ThemeProvider>
    </View>
  )
}

const ThemableSection = () => {
  return (
    <Section>
      <Heading3>
        <GradientText>Themable.</GradientText>
      </Heading3>
      <Spacer mb={10}>
        <Text>
          G2's versatile built-in theming system allows you to easily customize
          the UI.
          <br />A series of{" "}
          <Link
            href="https://g2components.wordpress.com/2020/10/23/creating-a-variable-system/"
            target="_blank"
          >
            Design Tokens
          </Link>{" "}
          can be refined, creating styles that ripple across the entire system.
        </Text>
      </Spacer>
      <View
        aria-hidden
        css={[
          ui.position.relative,
          { overflow: "hidden" },
          ui.frame.height(500),
        ]}
      >
        <View
          css={[
            ui.position.topLeft,
            { pointerEvents: "none", userSelect: "none" },
          ]}
        >
          <Text
            css={[
              ui.opacity(0.1),
              `
                  background: linear-gradient(
                   ${ui.get("colorText")},
                   rgba(0,0,0,0),
                   rgba(0,0,0,0),
                   rgba(0,0,0,0)
                  );
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
          `,
            ]}
            isBlock
            lineHeight={1.2}
            size={8}
          >
            {JSON.stringify(themeData, null, 2)}
          </Text>
        </View>
        <HStack alignment="center" css={[ui.margin.top(24)]}>
          <ZStack css={[ui.frame.width(300)]}>
            <ThemeProvider
              theme={{
                buttonPrimaryColor: "#000",
                buttonPrimaryBorderColor: "#000",
                fontFamily: "SF Mono, mono",
              }}
            >
              <ExampleCard
                css={[
                  {
                    transform:
                      "translate(-90%, 10%) rotate(-10deg) scale(0.95)",
                  },
                ]}
              />
            </ThemeProvider>

            <ThemeProvider
              theme={{
                buttonPrimaryColor: "#EA4C89",
                buttonPrimaryBorderColor: "#EA4C89",
                controlBorderRadius: "4px",
                controlBorderColor: "#eee",
                surfaceColor: "#F9F8FD",
                colorText: "#6E6D7A",
              }}
            >
              <ExampleCard
                css={[
                  {
                    transform: "translate(90%, 10%) rotate(10deg) scale(0.95)",
                  },
                ]}
              />
            </ThemeProvider>
            <ThemeProvider
              isDark
              theme={{
                controlBorderRadius: "50px",
                buttonPrimaryColor: "#20B954",
                buttonPrimaryBorderColor: "#20B954",
              }}
            >
              <ExampleCard css={[ui.scale(1.1)]} elevation={8} />
            </ThemeProvider>
          </ZStack>
        </HStack>
      </View>
    </Section>
  )
}

const ComingSoonSection = () => {
  return (
    <Section css={[ui.font.alignment.center]} pb={80} py={50}>
      <Heading3>Coming soon.</Heading3>
      <Spacer mb={10}>
        <CopyText>
          <Text>
            G2 is currently in a proposal stage. The core systems have been
            architected and the code has been prepped to be integrated into
            Gutenberg.
          </Text>
        </CopyText>
      </Spacer>
      <HStack alignment="center" spacing={6}>
        <Link
          href="https://g2components.wordpress.com/2020/11/25/project-maps-and-progress/"
          target="_blank"
        >
          Road Map and Progress
        </Link>
        <View>
          <Button
            href="https://github.com/itsjonq/g2#start-prototyping"
            size="large"
            target="_blank"
          >
            Try It Out
          </Button>
        </View>
      </HStack>
    </Section>
  )
}

export default function IndexPage() {
  return (
    <Layout>
      <SEO />
      <ThemeProvider isGlobal theme={theme} />
      <View
        css={[
          `
            ${ui.createToken("fontSize")}: 15px;
          `,
          `${getBreakpoint("md")`
              ${ui.createToken("fontSize")}: 20px;
            `}`,
        ]}
      >
        <IntroSection />
        <SystemsSection />
        <ModularSection />
        <AccessiblitySection />
        <ThemableSection />
        <ComingSoonSection />
      </View>
    </Layout>
  )
}
