<template>
    <div>
        <table>
                            
            <tr><label for="filtering">Choose way of flitering:</label>
                <select name="filter" id="filter">
                <option value="section">section</option>
                <option value="">Dave</option>
                <option value="pumpernickel">Pumpernickel</option>
                <option value="reeses">Reeses</option>
                </select>

                <th v-on:click="sortBy('filter')">Apply</th> 
                
                
            </tr>
            <tr  v-for="user in this.usersSorted" :key="user.id">   
                <td>{{ user.id }}</td>
                <td>{{ user.first_name }}</td>
                <td>{{ user.last_name }}</td>

            </tr>
        </table>

    </div>
</template>

<script>
    import _ from 'lodash';  // Allows us to do _.orderby in usersSorted()
    export default {
        data: function () {
            return {
                users: [     ],
                sortKey: ['customer_name'],
                sortOrder: ['asc'],
                filterBy: ['asc'],
            }
        },
        computed: {
            usersSorted: function() {
                return _.orderBy(this.users, this.sortKey, this.sortOrder)
                    .filter(user => {
                        if (this.filterBy) {
                            var searchFor = this.filterBy.toLowerCase();        // lets change everthing to lower ca                                                      // 
                            return ((user.first_name.toLowerCase().indexOf(searchFor)) !== -1)
                            || ((user.last_name.toLowerCase().indexOf(searchFor)) !== -1);
                        } else {
                            return true
                        }
                    });
            },
        },
        methods: {
            sortBy: function (key) {
                if (key == this.sortKey) {
                    this.sortOrder = (this.sortOrder == 'asc') ? 'desc' : 'asc';
                } else {
                    this.sortKey = key;
                    this.sortOrder = 'asc';
                }
            },
        }
    }
</script>