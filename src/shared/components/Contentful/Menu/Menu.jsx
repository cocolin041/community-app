/**
 * Menu component
 *
 */
/* global window */
import React from 'react';
import PT from 'prop-types';
import Dropdown from 'components/tc-communities/Dropdown';

import { isActive, linkText, target } from 'utils/contentful';
import MenuItem from './MenuItem';

export default function Menu(props) {
  const {
    menuItems, theme, baseUrl, parentBaseUrl, parentItems, activeParentItem,
  } = props;

  return (
    <nav className={theme.menuContainer}>
      {
        parentItems.length ? (
          <div className={theme.menuSwitchContainer}>
            <Dropdown
              options={parentItems.map(pI => ({
                label: linkText(pI),
                value: pI.sys.id,
                url: target(parentBaseUrl, pI),
              }))}
              value={activeParentItem.sys.id}
              onChange={(option) => { window.location.href = option.url; }}
            />
          </div>
        ) : null
      }
      <ul className={theme.container}>
        {
          menuItems.map(item => (
            <MenuItem
              item={item}
              theme={theme}
              isActive={isActive(baseUrl, item, 'menuItem')}
              key={item.sys.id}
              baseUrl={baseUrl}
            />
          ))
        }
      </ul>
    </nav>
  );
}

Menu.defaultProps = {
  theme: {},
  menuItems: [],
};

Menu.propTypes = {
  theme: PT.shape({
    container: PT.string,
    titleList: PT.string,
    titleListItem: PT.string,
    titleListItemSelected: PT.string,
    content: PT.string,
  }),
  menuItems: PT.arrayOf(PT.shape()),
  baseUrl: PT.string.isRequired,
  parentBaseUrl: PT.string.isRequired,
  parentItems: PT.arrayOf(PT.shape()).isRequired,
  activeParentItem: PT.shape().isRequired,
};
