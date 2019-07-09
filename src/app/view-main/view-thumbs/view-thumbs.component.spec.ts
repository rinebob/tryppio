import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewThumbsComponent } from './view-thumbs.component';

describe('ViewThumbsComponent', () => {
  let component: ViewThumbsComponent;
  let fixture: ComponentFixture<ViewThumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewThumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewThumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
