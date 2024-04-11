import {
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
} from "@fluentui/react-components";

export const SecondaryContentForMenuItems = ({ style }) => (
  <Menu style={{top: '32px'}}>
    <MenuTrigger disableButtonEnhancement>
      <Button>Toggle menu</Button>
    </MenuTrigger>

    <MenuPopover>
      <MenuList>
        <MenuItem secondaryContent="Ctrl+N">New File</MenuItem>
        <MenuItem secondaryContent="Ctrl+Shift+N">New Window</MenuItem>
        <MenuItem secondaryContent="Ctrl+O">Open File</MenuItem>
      </MenuList>
    </MenuPopover>
  </Menu>
);