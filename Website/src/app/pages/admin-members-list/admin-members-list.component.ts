import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member';
@Component({
  selector: 'app-admin-members-list',
  templateUrl: './admin-members-list.component.html',
  styleUrls: ['./admin-members-list.component.scss']
})
export class AdminMembersListComponent implements OnInit {
  members: Member[] = [];
  loading = false;

  statusOptions = [
    { value: 'pending', label: 'Ausstehend' },
    { value: 'active', label: 'Aktiv' },
    { value: 'inactive', label: 'Inaktiv' },
    { value: 'cancelled', label: 'Storniert' }
  ];

  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.loading = true;
    this.memberService.getAll().subscribe({
      next: (data) => {
        this.members = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  onStatusChange(memberId: number, newStatus: string) {  // ✅ string statt any
  this.memberService.updateStatus(memberId, newStatus).subscribe({
    next: () => console.log('Status aktualisiert'),
    error: (err) => console.error(err)
  });
}
}