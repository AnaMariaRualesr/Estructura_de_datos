
"""
    Class 2: Stack implementation following the LIFO principle
    
    """


class Stack:
    

    def __init__(self):
        self._elements = []

    def push(self, item):
        self._elements.append(item)

    def pop(self):

        if self.is_empty():
            raise IndexError("Cannot pop from an empty stack.")
        return self._elements.pop()

    def top(self):

        if self.is_empty():
            raise IndexError("Cannot retrieve top from an empty stack.")
        return self._elements[-1]

    def size(self):
        return len(self._elements)

    def is_empty(self):
        return len(self._elements) == 0


class Mission:

    def __init__(self, title, description, difficulty):
        self.title = title
        self.description = description
        self.difficulty = difficulty

    def __str__(self):
        return f"Mission: {self.title} | Difficulty: {self.difficulty}"


class MissionManager:

    def __init__(self):
        
        self._mission_stack = Stack()

    def accept_mission(self, mission):

        self._mission_stack.push(mission)
        print(f"Mission accepted: {mission.title}")

    def abandon_current_mission(self):

        if self._mission_stack.is_empty():
            print("There are no active missions.")
            return

        abandoned_mission = self._mission_stack.pop()
        print(f"Mission abandoned: {abandoned_mission.title}")

    def show_current_mission(self):

        if self._mission_stack.is_empty():
            print("There are no active missions.")
            return

        print("Current active mission:")
        print(self._mission_stack.top())

    def show_total_active_missions(self):

        print(f"Total active missions: {self._mission_stack.size()}")


# ==================================
# Demonstration of the sytem
# ==================================

if __name__ == "__main__":

    mission_manager = MissionManager()

    mission1 = Mission(
        "Rescue the Village",
        "Defend the village from invading enemies.",
        "Medium"
    )

    mission2 = Mission(
        "Explore the Ancient Cave",
        "Investigate the mysterious cave in the mountains.",
        "High"
    )

    mission3 = Mission(
        "Retrieve the Lost Artifact",
        "Find and recover the ancient magical artifact.",
        "Very High"
    )

    mission_manager.accept_mission(mission1)
    mission_manager.accept_mission(mission2)
    mission_manager.accept_mission(mission3)

    print("\n--- Current Status ---")
    mission_manager.show_current_mission()
    mission_manager.show_total_active_missions()

    print("\n--- Abandoning Current Mission ---")
    mission_manager.abandon_current_mission()

    print("\n--- Updated Status ---")
    mission_manager.show_current_mission()
    mission_manager.show_total_active_missions()
