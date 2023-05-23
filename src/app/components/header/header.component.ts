import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private nav = false

  public showMenu() {
    if (this.nav) {

      this.nav = false
      document.getElementById("nav")!.style.height = "0"
      document.getElementById("searchbar-container")!.style.display = "flex";
      // ESTILOS X
      document.getElementById("line1")!.style.transform = "rotate(0deg)"
      document.getElementById("line2")!.style.display = "block"
      document.getElementById("line3")!.style.transform = "rotate(0deg)"
      document.getElementById("h-linear-cont")!.style.gap = "5px"
      document.getElementById("line3")!.style.width = "1.9rem"
      document.getElementById("line1")!.style.width = "1.9rem"
      document.getElementById("line3")!.style.marginTop = "0px"
    }
    else {

      this.nav = true
      // ESTILOS X
      document.getElementById("line1")!.style.transform = "rotate(45deg)"
      document.getElementById("line2")!.style.display = "none"
      document.getElementById("line3")!.style.transform = "rotate(-45deg)"
      document.getElementById("h-linear-cont")!.style.gap = "0px"
      document.getElementById("line3")!.style.width = "2.5rem"
      document.getElementById("line1")!.style.width = "2.5rem"
      document.getElementById("line3")!.style.marginTop = "-2px"

      // NAV
      document.getElementById("nav")!.style.height = "max-content"
      document.getElementById("searchbar-container")!.style.display = "none";
    }

  }
  constructor() { }

  ngOnInit(): void {
  }

}
