import { PolymorphicComponent } from './_shared';
import { TabState, TabListProps, TabProps, TabPanelProps } from 'reakit';

export declare type TabsProps = TabState;

/**
 * `Tabs` is a layout component that renders similar views within the same context.
 *
 * @example
 * ```jsx
 * import { Tabs, Tab, TabList, TabPanel } from `@wp-g2/components`;
 *
 * function Example() {
 *   return (
 *    <Tabs>
 *      <TabList>
 *        <Tab>One</Tab>
 *        <Tab>Two</Tab>
 *        <Tab>Three</Tab>
 *      </TabList>
 *      <TabPanel>One</TabPanel>
 *      <TabPanel>Two</TabPanel>
 *      <TabPanel>Three</TabPanel>
 *    </Tabs>
 *   )
 * }
 * ```
 *
 * @see
 * https://reakit.io/docs/tab/
 */
export declare const Tabs: PolymorphicComponent<TabsProps>;

/**
 * `Tab` is a layout component that renders a selectable item within a `TabList`.
 *
 * @example
 * ```jsx
 * import { Tabs, Tab, TabList } from `@wp-g2/components`;
 *
 * function Example() {
 *   return (
 *    <Tabs>
 *      <TabList>
 *        <Tab>One</Tab>
 *        <Tab>Two</Tab>
 *        <Tab>Three</Tab>
 *      </TabList>
 *    </Tabs>
 *   )
 * }
 * ```
 *
 * @see
 * https://reakit.io/docs/tab/#tab
 */
export declare const Tab: PolymorphicComponent<TabProps>;

/**
 * `TabList` is a layout component that renders a selectable `Tab` items within `Tabs`.
 *
 * @example
 * ```jsx
 * import { Tabs, Tab, TabList } from `@wp-g2/components`;
 *
 * function Example() {
 *   return (
 *    <Tabs>
 *      <TabList>
 *        <Tab>One</Tab>
 *        <Tab>Two</Tab>
 *        <Tab>Three</Tab>
 *      </TabList>
 *    </Tabs>
 *   )
 * }
 * ```
 *
 * @see
 * https://reakit.io/docs/tab/#tab
 */
export declare const TabList: PolymorphicComponent<TabListProps>;

/**
 * `TabPanel` is a layout component that renders content that matches a `Tab` within `Tabs`.
 *
 * @example
 * ```jsx
 * import { Tabs, Tab, TabList, TabPanel } from `@wp-g2/components`;
 *
 * function Example() {
 *   return (
 *    <Tabs>
 *      <TabList>
 *        <Tab>One</Tab>
 *        <Tab>Two</Tab>
 *        <Tab>Three</Tab>
 *      </TabList>
 *      <TabPanel>One</TabPanel>
 *      <TabPanel>Two</TabPanel>
 *      <TabPanel>Three</TabPanel>
 *    </Tabs>
 *   )
 * }
 * ```
 *
 * @see
 * https://reakit.io/docs/tab/#tab
 */
export declare const TabPanel: PolymorphicComponent<TabPanelProps>;
