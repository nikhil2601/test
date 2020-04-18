## FaIcon: Font Awesome Icon component


### Selecting an Icon
* Choose a Font Awesome icon that we support, e.g. [Free Regular or Solid Icons](https://fontawesome.com/icons?d=gallery&s=regular,solid&m=free)

	`arrow-alt-circle-left`

* Convert its name to TitleCase and prepend that with `fa`

	`faArrowAltCircleLeft`

* Import the icon and specify it within `<FaIcon/>`.

	```
	import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
	...
	<FaIcon icon={faArrowAltCircleLeft} />
	
	```	

* Style using the additional properties listed below.

	`<FaIcon color="#555" height="30px" width="30px" icon="arrow-alt-circle-left" />`


### FaIcon Properties
Use standard CSS values except where noted.

```
    color: PropTypes.string
    
    // vertically align icons by including support for `fixed-width`
    // Ref: https://fontawesome.com/how-to-use/on-the-web/styling/fixed-width-icons
    fixedWidth: PropTypes.bool
    
    height: responsiveProptypes(PropTypes.string),
    
	// The font-awesome icon, an imported React Object
	// e.g. `icon={faCoffeeAlt}`
	icon: PropTypes.oneOfType(PropTypes.object),
    
    margin: responsiveProptypes(PropTypes.string),
    
    opacity: responsiveProptypes(PropTypes.number),

    padding: responsiveProptypes(PropTypes.string),

    width: responsiveProptypes(PropTypes.string),
```

**Note**: The icon will be rendered within the area described by its height and width. E.g. a square icon with `height="100px" width="40px"` will appear to be a 40px square rendered within a 40px x 100px image (with top and bottom "padding" of 30px). See the coffee icon for an example of this.
