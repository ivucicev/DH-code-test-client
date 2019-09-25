import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodedResultDialogComponent } from './encoded-result-dialog.component';

describe('EncodedResultDialogComponent', () => {
  let component: EncodedResultDialogComponent;
  let fixture: ComponentFixture<EncodedResultDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncodedResultDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncodedResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
