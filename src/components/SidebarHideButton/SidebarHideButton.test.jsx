import { render, screen } from "@testing-library/react"
import HideSidebarBtn from "./SidebarHideButton"

test('should render HideSideBarButtonVisible', () => {
    render(
        <HideSidebarBtn onToggleState={() => {}} hidden={false}/>
    )

    const result = screen.getByText('Hide Sidebar');

    expect(result).toBeDefined();
})

test('should render HideSideBarButtonHidden', () => {
    render(
        <HideSidebarBtn onToggleState={() => {}} hidden={true}/>
    )

    const result = screen.getByTestId('sidebarhidden');

    expect(result).toBeDefined();
})