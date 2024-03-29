export const items = [
    {
        label: '开始唤醒',
        value: {
            type: "StartUp",
            params: {
                client_type: "Bilibili",
                start_game_enabled: true
            }
        }
    },
    {
        label: '自动公招',
        value: {
            type: "Recruit",
            params: {
                select: [
                    1,
                    2,
                    3,
                    4,
                    5
                ],
                confirm: [
                    3,
                    4,
                    5
                ],
                times: 4,
                expedite: false
            },

        }
    },
    {
        label: '基建换班',
        value: {
            type: "Infrast",
            params: {
                facility: [
                    "Trade",
                    "Reception",
                    "Mfg",
                    "Control",
                    "Power",
                    "Office",
                    "Dorm"
                ],
                drones: "PureGold"
            }
        }
    },
    {
        label: '刷理智',
        value: {
            type: "Fight",
            params: {
                stage: "1-7",
            }
        }
    },
    {
        label: '信用购物',
        value: {
            type: "Mall",
            params: {
                shopping: true
            }
        }
    },
    {
        label: '领取奖励',
        value: {
            type: "Award"
        }
    },
]

export const chips = {
    "StartUp": "开始唤醒",
    "Recruit": "自动公招",
    "Infrast": "基建换班",
    "Fight": "刷理智",
    "Mall": "信用购物",
    "Award": "领取奖励"
}


export const chipsType = {
    "StartUp": "StartUp",
    "Recruit": "Recruit",
    "Infrast": "Infrast",
    "Fight": "Fight",
    "Mall": "Mall",
    "Award": "Award"
}








