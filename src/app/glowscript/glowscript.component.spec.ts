import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlowscriptComponent } from './glowscript.component';

describe('GlowscriptComponent', () => {
  let component: GlowscriptComponent;
  let fixture: ComponentFixture<GlowscriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlowscriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlowscriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
