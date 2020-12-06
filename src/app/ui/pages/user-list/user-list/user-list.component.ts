import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';
import { User } from '../../../../responses/user-list-response';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {

    constructor(
        private userListService: UserListService,
    ) {}

    async ngOnInit() {

        this.users = await this.getAllUsers();
    }

    users: User[];

    private async getAllUsers() {

        const bannedUsersResponse = await this.userListService.getBannedUsers().toPromise();
        const commonUsersResponse = await this.userListService.getCommonUsers().toPromise();

        const error = [ bannedUsersResponse.errors, commonUsersResponse.errors ];

        this.showError(error);

        let resultArrayOfUsers = bannedUsersResponse.userList;

        Array.prototype.push.apply(resultArrayOfUsers, commonUsersResponse.userList);

        return resultArrayOfUsers;
    }

    async banUser(userId: number) {

        this.userListService.banUser(userId)
            .subscribe(response => this.showError([ response.errors ]));

        this.users = await this.getAllUsers();
    }

    async unbanUser(userId: number) {

        this.userListService.unbanUser(userId)
            .subscribe(response => this.showError([ response.errors ]));

        this.users = await this.getAllUsers();
    }

    private showError(errors: string[]) {

        for (let i = 0; i < errors.length; i++) {
            if (errors[i]) {
                alert(errors[i]);
            }
        }
    }
}
