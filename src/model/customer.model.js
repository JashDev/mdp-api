import dayjs from "dayjs";

export default class CustomerModel {
    constructor({id, name, lastName, birthday, createdAt = null}) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.birthday = birthday;
        this.createdAt = createdAt;
    }

    static fromJson(json) {
        return new CustomerModel(
            {
                id: json.id,
                name: json.name,
                lastName: json.last_name,
                birthday: dayjs(json.birthday).format('DD/MM/YYYY'),
                createdAt: dayjs(json.created_at).format('DD/MM/YYYY HH:mm:ss')
            }
        );
    }

    static fromJsonArray(jsonArray) {
        return jsonArray.map(json => CustomerModel.fromJson(json));
    }
}
