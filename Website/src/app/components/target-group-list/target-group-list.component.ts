import { Component } from '@angular/core';

@Component({
  selector: 'app-target-group-list',
  templateUrl: './target-group-list.component.html',
  styleUrls: ['./target-group-list.component.scss']
})
export class TargetGroupListComponent {

}
export interface TargetGroup {
  id: number;
  description: string;
  links?: { text: string; route: string }[];
}
