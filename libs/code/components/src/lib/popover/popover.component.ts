import {
  Component,
  ViewChild,
  HostBinding,
  ComponentRef,
  EmbeddedViewRef,
} from '@angular/core';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';

@Component({
  selector: 'cnd-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;
  @HostBinding('class.cnd-popover') cls = true;

  attachComponentPortal<T>(
    componentPortal: ComponentPortal<any>
  ): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(componentPortal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
