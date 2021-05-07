import { Component, OnInit } from '@angular/core';
import { EventDrivenService } from 'src/app/Services/event.driven.service';
import { ActionEvent } from 'src/app/State/product.state';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  public counter: number = 0;
  constructor(private eventDrivenService: EventDrivenService) {}

  ngOnInit(): void {
    this.eventDrivenService.sourceEventSubjectObservable.subscribe(
      (actionEvent: ActionEvent) => {
        ++this.counter;
      }
    );
  }
}
