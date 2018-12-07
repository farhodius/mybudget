import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlaccountComponent } from './glaccount.component';

describe('GlaccountComponent', () => {
  let component: GlaccountComponent;
  let fixture: ComponentFixture<GlaccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlaccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
