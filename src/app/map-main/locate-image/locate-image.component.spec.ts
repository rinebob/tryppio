import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocateImageComponent } from './locate-image.component';

describe('LocateImageComponent', () => {
  let component: LocateImageComponent;
  let fixture: ComponentFixture<LocateImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocateImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
