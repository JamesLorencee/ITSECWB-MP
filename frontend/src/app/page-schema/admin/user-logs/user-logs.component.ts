import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { MgmtService } from '../../../services/mgmt.service';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrl: './user-logs.component.scss',
})
export class UserLogsComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private mgmtService: MgmtService,
  ) {}

  logList: any;

  ngOnInit() {
    this.viewLogs();
  }

  viewLogs() {
    this.mgmtService.getLogs().subscribe((res) => {
      this.logList = res.logList;
    });
  }

  getFormattedDetails(details: string): string {
    if (!details) {
      return details;
    }
    const regex = /(\.(?!\d))/g;
    return details.replace(regex, '.<br/>');
  }
}
