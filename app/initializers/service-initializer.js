export function initialize(application ) {
  application.inject('component:pw-sidebar', 'ui-service', 'service:ui-service', {singleton: true});
  application.inject('component:pw-select', 'ui-service', 'service:ui-service', {singleton: true});
  application.inject('component:pw-iconmenu', 'ui-service', 'service:ui-service', {singleton: true});

  application.inject('route', 'ui-service', 'service:ui-service', {singleton: true});
  application.inject('route', 'datastub', 'service:datastub', {singleton: true});

  application.inject('controller', 'datastub', 'service:datastub', {singleton: true});
  application.inject('controller', 'user-service', 'service:user-service', {singleton: true});
}

export default {
  name: 'service-initializer',
  initialize
};
