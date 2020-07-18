import React, {forwardRef} from 'react';
import clsx from 'clsx';
import './index.scss';

interface ComponentProps {
  iconClassName?: string;
  src?: any;
  heightAuto?: boolean;
  widthAuto?: boolean;
  matchContainer?: boolean;
  propsToAppendToElement?: object;
}

/**
 * @param className {String} : to override default CSS of icons
 * @param src {String} : this will be SVG file, which will be converted to string
 * @param heightAuto {Boolean} : to set height of icon as auto
 * @param widthAuto {Boolean} : to set width of icon as auto
 * @param propsToAppendToElement {*} : Object of properties to override default icon behavior. DOM event handlers can be passed here
 */

const IconLoader = forwardRef<HTMLSpanElement, ComponentProps>((props, ref) => {
  if (!props.src || !props.src.match) {
    return null;
  }
  const match = props.src.match(/data:image\/svg[^,]*?(;base64)?,(.*)/);
  let html = '';
  if (match) {
    html = match[1] ? atob(match[2]) : decodeURIComponent(match[2]);
  }
  if (!html) {
    return null;
  }

  const {src, heightAuto, widthAuto, matchContainer, className, ...propsToAppendToElement} = props;
  return (
    <span
      ref={ref}
      {...propsToAppendToElement}
      className={clsx(
        'default-icon-style',
        {
          'match-container': matchContainer,
          'ht-auto': heightAuto,
          'wt-auto': widthAuto,
        },
        className || '',
      )}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
});

export default IconLoader;
